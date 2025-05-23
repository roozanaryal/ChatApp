import React from "react";

const GenderCheckbox = ({ onGenderChange, selectedGender }) => {
  return (
    <div>
      <label className="block text-white text-xs font-medium mb-1 drop-shadow">
        Gender
      </label>
      <div className="flex space-x-4">
        <label className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={selectedGender === "male"}
            onChange={() => onGenderChange("male")}
            className="mr-1.5 w-3.5 h-3.5 border-white/10 bg-white/10 text-blue-500 focus:ring-blue-500/50"
          />
          Male
        </label>
        <label className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer text-sm">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={selectedGender === "female"}
            onChange={() => onGenderChange("female")}
            className="mr-1.5 w-3.5 h-3.5 border-white/10 bg-white/10 text-blue-500 focus:ring-blue-500/50"
          />
          Female
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
