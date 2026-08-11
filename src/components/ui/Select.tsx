import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectProps = {
  value?: string | number | null;
  onChange: (value: any) => void;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function Select({
  value,
  onChange,
  options,
  disabled,
  className,
  style,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(target))
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 99999,
      });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleSelect = (val: string | number) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      style={style}
      ref={containerRef}
    >
      <button
        type="button"
        className={styles.trigger}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : ""}</span>
        <ChevronDown
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
        />
      </button>

      {isOpen && !disabled && typeof document !== "undefined" && createPortal(
        <ul className={styles.dropdown} role="listbox" style={dropdownStyle} ref={dropdownRef}>
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              data-selected={option.value === value}
              className={styles.option}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}
