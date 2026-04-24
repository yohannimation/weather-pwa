import React, { useState, useRef, useEffect, useId } from 'react';

// Components
import Icon from 'components/Icon';

// CSS
import styles from './select.module.css';

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: SelectOption | null;
    onChange: (option: SelectOption) => void;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Sélectionner...',
    disabled = false,
    label,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const id = useId();

    // Close if outdoor click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll to the focused option
    useEffect(() => {
        if (focusedIndex >= 0 && listRef.current) {
            const item = listRef.current.children[focusedIndex] as HTMLElement;
            item?.scrollIntoView({ block: 'nearest' });
        }
    }, [focusedIndex]);

    const openDropdown = () => {
        if (disabled) return;
        setIsOpen(true);
        setFocusedIndex(value ? options.findIndex(o => o.value === value.value) : 0);
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const selectOption = (option: SelectOption) => {
        onChange(option);
        closeDropdown();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (!isOpen) {
                    openDropdown();
                } else {
                    const focused = options[focusedIndex];
                    if (focused) selectOption(focused);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) openDropdown();
                else setFocusedIndex(i => Math.min(i + 1, options.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) openDropdown();
                else setFocusedIndex(i => Math.max(i - 1, 0));
                break;
            case 'Escape':
                closeDropdown();
                break;
            case 'Tab':
                closeDropdown();
                break;
        }
    };

    return (
        <div className={styles.wrapper} ref={containerRef}>
            {label && (
                <label className={styles.label} id={`${id}-label`}>
                    {label}
                </label>
            )}
            <div
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-labelledby={label ? `${id}-label` : undefined}
                aria-controls={`${id}-listbox`}
                aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
                tabIndex={disabled ? -1 : 0}
                className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''} ${disabled ? styles.triggerDisabled : ''}`}
                onClick={() => isOpen ? closeDropdown() : openDropdown()}
                onKeyDown={handleKeyDown}
            >
                <span className={value ? styles.triggerValue : styles.triggerPlaceholder}>
                    {value?.label ?? placeholder}
                </span>
                <Icon size={20} name={isOpen ? 'chevron-up' : 'chevron-down'} />
            </div>

            <ul
                ref={listRef}
                id={`${id}-listbox`}
                role="listbox"
                aria-label={label}
                className={isOpen ? styles.dropdown : styles.dropdownClose}
            >
                {isOpen && 
                    options.map((option, index) => {
                        const isSelected = option.value === value?.value;
                        const isFocused = index === focusedIndex;

                        return (
                            <li
                                key={option.value}
                                id={`${id}-option-${index}`}
                                role="option"
                                aria-selected={isSelected}
                                className={`
                                    ${styles.option}
                                    ${isSelected ? styles.optionSelected : ''}
                                    ${isFocused ? styles.optionFocused : ''}
                                `}
                                onMouseDown={(e) => {
                                    e.preventDefault(); // Prevent the trigger blur
                                    selectOption(option);
                                }}
                            >
                                {isSelected && <Icon size={20} name='tick' />}
                                {option.label}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Select;