import React, { useState, useRef, useEffect } from "react";

const CustomDatePicker = ({label, setDate}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    const datepickerRef = useRef(null);

    const toggleCalendar = () => setIsOpen(!isOpen);

    const selectDate = (day) => {
        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        setSelectedDate(formattedDate);
        setDate(prev => ({
            ...prev,
            dateOfBirth : formattedDate
        }))
        setIsOpen(false);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowYearDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Generate days for the selected month
    const getDates = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    // Handle month navigation
    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Generate years for dropdown (from 1960 to currentYear + 10)
    const years = Array.from({ length: (new Date().getFullYear() + 10) - 1960 + 1 }, (_, i) => 1960 + i);

    // Month and Year Names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="flex flex-col gap-[0.7rem] w-full">
            <label htmlFor="email">
                {
                    label
                }
            </label>
            <div className="relative w-full" ref={datepickerRef}>
                {/* Date Input Field */}
                <div
                    onClick={toggleCalendar}
                    className="w-full border-b-2 border-[#5ca64f] px-2 py-3 cursor-pointer text-gray-700 flex justify-between items-center"
                >
                    <span className="opacity-50">{selectedDate || "Select a date"}</span>
                    <svg className="w-5 h-5 text-gray-500 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Calendar Dropdown */}
                {isOpen && (
                    <div className="absolute bottom-12 left-0 w-full bg-white border rounded-lg shadow-lg p-4">
                        {/* Month & Year Selection */}
                        <div className="flex justify-between items-center mb-2">
                            <button onClick={handlePrevMonth} className="p-1 text-gray-600 hover:text-black">◀</button>

                            {/* Month & Year Dropdown */}
                            <div className="relative">
                                <span
                                    className="font-semibold cursor-pointer"
                                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                                >
                                    {months[currentMonth]} {currentYear}
                                </span>

                                {/* Year Dropdown */}
                                {showYearDropdown && (
                                    <div className="absolute top-6 left-0 bg-white border rounded-lg shadow-md max-h-40 overflow-y-auto">
                                        {years.map((year) => (
                                            <div
                                                key={year}
                                                className="px-4 py-1 hover:bg-[#008200] hover:text-white cursor-pointer"
                                                onClick={() => {
                                                    setCurrentYear(year);
                                                    setShowYearDropdown(false);
                                                }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button onClick={handleNextMonth} className="p-1 text-gray-600 hover:text-black">▶</button>
                        </div>

                        {/* Weekdays */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-600">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                                <span key={d}>{d}</span>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center mt-1">
                            {getDates().map((day) => (
                                <button
                                    key={day}
                                    onClick={() => selectDate(day)}
                                    className="w-10 h-10 rounded-full hover:bg-[#008200] hover:text-white transition duration-200"
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default CustomDatePicker;
