import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import * as Flags from 'country-flag-icons/react/3x2';
import COUNTRIES from '../../utils/countries.json';

const FlagIcon = ({ code, className, title }) => {
  if (!code) return null;
  const FlagComponent = Flags[code.toUpperCase()];
  if (!FlagComponent) return null;
  return <FlagComponent title={title} className={className} />;
};

export const InternationalPhoneInput = ({ label, name, value = '', onChange, required = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const getInitialState = (currentValue) => {
    // Default to Ethiopia (ET) if empty
    if (!currentValue) return { country: COUNTRIES.find(c => c.code === 'ET'), rawNumber: '' };
    
    // Sort dial codes by length descending to match longest prefix first (e.g., +254 vs +25)
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
    
    // Fallback if no match
    let matchedCountry = COUNTRIES.find(c => c.code === 'ET');
    let rawNumber = currentValue;
    
    // Check if it starts with +
    const valString = String(currentValue).trim();
    if (valString.startsWith('+')) {
      for (const c of sortedCountries) {
        if (valString.startsWith(c.dialCode)) {
          matchedCountry = c;
          rawNumber = valString.slice(c.dialCode.length).trim();
          break;
        }
      }
    }
    
    return { country: matchedCountry, rawNumber };
  };

  const initialState = getInitialState(value);
  const [selectedCountry, setSelectedCountry] = useState(initialState.country);
  const [rawNumber, setRawNumber] = useState(initialState.rawNumber);

  // Sync incoming value changes from parent (e.g., API loaded data)
  useEffect(() => {
    // Only update if parent value actually differs from what we would construct
    const currentConstructed = rawNumber ? `${selectedCountry?.dialCode} ${rawNumber}` : '';
    const parentVal = (value || '').trim();
    if (parentVal && parentVal !== currentConstructed.trim()) {
      const { country, rawNumber: newRaw } = getInitialState(value);
      setSelectedCountry(country);
      setRawNumber(newRaw);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');
    
    if (onChange) {
      onChange({ target: { name, value: rawNumber ? `${country.dialCode} ${rawNumber}` : '' } });
    }
  };

  const handleNumberChange = (e) => {
    // Basic formatting: allow numbers, spaces, hyphens
    let val = e.target.value.replace(/[^\d\s-]/g, '');
    setRawNumber(val);
    
    if (onChange) {
      onChange({ target: { name, value: val ? `${selectedCountry?.dialCode} ${val}` : '' } });
    }
  };

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-stretch border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white" ref={dropdownRef}>
        
        {/* Country Selector Button */}
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-2 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-l-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:z-10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCountry && (
            <FlagIcon 
              code={selectedCountry.code}
              title={selectedCountry.name}
              className="w-5 h-auto object-contain flex-shrink-0 shadow-sm rounded-sm"
            />
          )}
          <span className="text-gray-700">{selectedCountry?.code}</span>
          <span className="text-gray-500 font-normal">({selectedCountry?.dialCode})</span>
          <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
        </button>

        {/* Number Input */}
        <input
          type="tel"
          className="block w-full rounded-r-md border-0 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
          placeholder="Phone number"
          value={rawNumber}
          onChange={handleNumberChange}
          required={required}
        />

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 top-full left-0 mt-1 w-[320px] max-w-[90vw] max-h-72 flex flex-col bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
            <div className="sticky top-0 bg-white p-2 border-b border-gray-100 rounded-t-md z-10">
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                placeholder="Search country or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    if (filteredCountries.length > 0) {
                      handleCountrySelect(filteredCountries[0]);
                    }
                  }
                }}
                autoFocus
              />
            </div>
            <ul className="flex-1 overflow-y-auto py-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <li
                    key={country.code}
                    className={`flex items-center px-4 py-2.5 text-sm cursor-pointer hover:bg-blue-50 transition-colors ${selectedCountry?.code === country.code ? 'bg-blue-50 font-medium' : 'text-gray-700'}`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <FlagIcon 
                      code={country.code}
                      title={country.name}
                      className="w-5 h-auto object-contain mr-3 flex-shrink-0 shadow-sm rounded-sm"
                    />
                    <span className="flex-grow flex items-center gap-2">
                      <span>{country.name}</span>
                      <span className="text-gray-500 font-normal">({country.dialCode})</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-500 text-center">No countries found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
