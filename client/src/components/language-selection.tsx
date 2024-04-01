import React, { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  onLanguageChange?: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    if(onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
