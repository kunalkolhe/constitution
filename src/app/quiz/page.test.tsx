import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '@/context/LanguageContext';
import QuizPage from './page';

function renderQuiz() {
  return render(
    <LanguageProvider>
      <QuizPage />
    </LanguageProvider>
  );
}

describe('Quiz page', () => {
  let randomSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    // pickRandomQuestions() shuffles via `.sort(() => 0.5 - Math.random())`.
    // Forcing Math.random() to always return exactly 0.5 makes every
    // comparison 0, which leaves the array in its original order (V8's sort
    // is stable) — so the round is deterministically the first ROUND_LENGTH
    // questions from the bank, in their original order.
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    randomSpy.mockRestore();
  });

  it('starts the countdown timer immediately when the quiz begins (regression test)', () => {
    // Regression test for a real bug: the countdown effect's dependency
    // array was missing `gameMode`, so transitioning from the menu into the
    // quiz didn't re-run the effect — the timer for question 1 never
    // started until the *second* question. This test fails on that old code
    // and passes on the fix.
    renderQuiz();

    fireEvent.click(screen.getByText('Civics Quiz'));

    const timerBar = document.querySelector('.origin-left') as HTMLElement;
    expect(timerBar).not.toBeNull();
    expect(timerBar.style.width).toBe('100%');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // If the timer is running, 3 seconds off a 30-second bar should have
    // moved noticeably away from 100%.
    expect(timerBar.style.width).not.toBe('100%');
  });

  it('awards points and increases the streak for a correct answer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Civics Quiz'));

    // Question 1: "Which article deals with the Right to Equality?" -> "Article 14"
    fireEvent.click(screen.getByText('Article 14'));

    expect(screen.getByText(/Streak 1/)).toBeInTheDocument();
  });

  it('resets the streak after a wrong answer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Civics Quiz'));

    // Deliberately wrong answer for question 1.
    fireEvent.click(screen.getByText('Article 19'));

    expect(screen.getByText(/Streak 0/)).toBeInTheDocument();
  });

  it('advances to question 2 after answering, without a stuck timer', () => {
    renderQuiz();
    fireEvent.click(screen.getByText('Civics Quiz'));
    fireEvent.click(screen.getByText('Article 14'));

    // handleNext() fires 1.5s after answering.
    act(() => {
      vi.advanceTimersByTime(1600);
    });

    expect(screen.getByText('Question 2 of 10')).toBeInTheDocument();
  });
});
