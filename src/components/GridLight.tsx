import React, { useEffect, useState } from "react";

const config = [
  [0, 1, 0],
  [1, 0, 1],
  [1, 0, 0],
];

interface Light {
  value: number;
  isSelected: boolean;
  order?: number;
}

const reverseOrderTimeOut: number = 500;
const reverseCallTimeOUt: number = 1000;

const GridLight = () => {
  const [newConfig, setNewConfig] = useState<Light[]>(() => {
    const newArray: Light[] = [];
    config.map((row) => {
      return row.map((col) => {
        newArray.push({ value: col, isSelected: false });
      });
    });

    return newArray;
  });

  const [order, setOrder] = useState<number>(1);

  const handleClick = (_: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!newConfig[index]?.order) {
      setNewConfig((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, isSelected: !item.isSelected, order } : item
        )
      );
      setOrder((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const reverseLights = () => {
      const reverseLightOrders = [...newConfig]
        .filter((light) => light.order)
        .sort((a, b) => b.order! - a.order!);

      for (let i = 0; i < reverseLightOrders.length; i++) {
        const light = reverseLightOrders[i];
        setTimeout(() => {
          setNewConfig((prev) =>
            prev.map((item) =>
              item.order === light.order
                ? { value: item.value, isSelected: !item.isSelected }
                : item
            )
          );
        }, reverseOrderTimeOut * i + 1);
      }
    };

    const isEveryPositiveValueSelected = newConfig
      .filter((item) => item.value)
      .every((item) => item.order);

    if (isEveryPositiveValueSelected) {
      setTimeout(() => {
        reverseLights();
      }, reverseCallTimeOUt);
    }
  }, [newConfig]);

  return (
    <div>
      {" "}
      <h1 className="text-center font-bold text-2xl my-4">GridLight</h1>
      <div className="grid-container w-full grid place-content-center grid-rows-3 grid-cols-[95px_95px_95px] gap-2">
        {newConfig.map((conf, index) =>
          conf.value ? (
            <div
              key={Math.random()}
              className="flex justify-center items-center cursor-pointer text-xl text-black font-semibold aspect-square"
              style={
                conf.isSelected
                  ? { backgroundColor: "purple" }
                  : { backgroundColor: "darkorange" }
              }
              onClick={(e) => handleClick(e, index)}
            >
              {conf.order}
            </div>
          ) : (
            <div
              key={Math.random()}
              className="flex justify-center items-center text-xl text-black font-semibold pointer-events-none aspect-square"
              style={{
                backgroundColor: "white",
              }}
            >
              {conf.order}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GridLight;
