import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

function TestConsumer() {
  const { language, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="current-language">{language}</span>
      <button onClick={() => setLanguage('हिंदी')}>Switch to Hindi</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English when nothing is saved', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId('current-language')).toHaveTextContent('English');
  });

  it('restores a previously saved language after mount', async () => {
    localStorage.setItem('bs_lang', 'मराठी');

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    // The saved value is applied in an effect (deliberately deferred to
    // avoid a server/client hydration mismatch), so it lands one tick after
    // the initial render rather than being present immediately.
    await waitFor(() =>
      expect(screen.getByTestId('current-language')).toHaveTextContent('मराठी')
    );
  });

  it('setLanguage updates state and persists the choice to localStorage', () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByText('Switch to Hindi'));

    expect(screen.getByTestId('current-language')).toHaveTextContent('हिंदी');
    expect(localStorage.getItem('bs_lang')).toBe('हिंदी');
  });

  it('throws a clear error when used outside a LanguageProvider', () => {
    // Swallow the expected console.error React logs for this one render.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
    spy.mockRestore();
  });
});
