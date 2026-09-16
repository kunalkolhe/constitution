import { describe, it, expect } from 'vitest';
import { translate } from './index';

describe('translate', () => {
  it('returns the Hindi string for a translated language', () => {
    expect(translate('हिंदी', 'home')).toBe('मुखपृष्ठ');
  });

  it('returns the English string when English is requested', () => {
    expect(translate('English', 'home')).toBe('Home');
  });

  it('falls back to English for a language with no dictionary yet', () => {
    expect(translate('मराठी', 'home')).toBe('Home');
    expect(translate('বাংলা', 'quiz')).toBe('Quiz');
  });

  it('falls back to the raw key if it exists in no dictionary at all', () => {
    expect(translate('English', 'thisKeyDoesNotExist')).toBe('thisKeyDoesNotExist');
  });
});
