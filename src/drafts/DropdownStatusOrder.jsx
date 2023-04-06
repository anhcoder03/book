import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../hooks/useClickOutSide";

const DropdownStatusOrder = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel = "Trạng thái giao hàng",
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: "status",
    defaultValue: "",
  });
  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);
  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="relative w-full" ref={nodeRef}>
      <div
        className="flex items-center justify-between p-5 bg-white border rounded-lg cursor-pointer border-gray100"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full z-10 rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {Object.keys(data).map((key) => (
          <div
            className="p-5 cursor-pointer hover:bg-gray-100"
            onClick={handleClickDropdownItem}
            data-value={data[key]}
            key={key}
          >
            {data[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownStatusOrder;
