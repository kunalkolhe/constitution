import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@/context/LanguageContext';
import SimulatorPage from './page';

function renderSimulator() {
  return render(
    <LanguageProvider>
      <SimulatorPage />
    </LanguageProvider>
  );
}

describe('Simulator page', () => {
  let randomSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // pickRandomScenarios() shuffles via `.sort(() => 0.5 - Math.random())`.
    // Forcing Math.random() to always return exactly 0.5 makes every
    // comparison 0, which leaves the array in its original order (V8's sort
    // is stable) — so scenario 1 (id: 1) is deterministically first.
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    randomSpy.mockRestore();
  });

  it('increments the score when the correct option is chosen', () => {
    renderSimulator();

    // Scenario 1's correct option, from src/data/scenarios.ts.
    fireEvent.click(screen.getByText('Article 19: Freedom of Speech & Peaceful Assembly'));

    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });

  it('does not increment score and shows the explanation for a wrong option', () => {
    renderSimulator();

    fireEvent.click(screen.getByText('Article 21: Right to Life and Liberty'));

    expect(screen.getByText('Actually...')).toBeInTheDocument();
  });

  it('locks in the answer so a second click has no further effect', () => {
    renderSimulator();

    const correctOption = screen.getByText('Article 19: Freedom of Speech & Peaceful Assembly');
    fireEvent.click(correctOption);
    fireEvent.click(screen.getByText('Article 21: Right to Life and Liberty'));

    // The first (correct) answer should still be the one marked "Correct!",
    // not overwritten by the second click.
    expect(screen.getByText('Correct!')).toBeInTheDocument();
  });
});
