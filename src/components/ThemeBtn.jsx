import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import useTheme from '../contexts/ThemeContext'

function ThemeBtn() {
    const { theme, lightMode, darkMode } = useTheme()

    const toggleTheme = () => {
        if (theme === 'light') {
            darkMode()
        } else {
            lightMode()
        }
    }

    return (
        <div className="flex justify-end p-4 mr-6 sm:mr-4">
            <label className="relative inline-flex items-center cursor-pointer sm:ml-5">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    onChange={toggleTheme} 
                    checked={theme === 'dark'}
                />
                <div className="w-14 h-8 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:bg-gray-600 relative sm:bottom-[15px] sm:left-[10px]">
                    <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${theme === 'dark' ? 'transform translate-x-6' : ''}`}>
                        {theme === 'light' ? (
                            <FaSun className="m-1" />
                        ) : (
                            <FaMoon className="m-1" />
                        )}
                    </div>
                </div>
            </label>
        </div>
    )
}

export default ThemeBtn