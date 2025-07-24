import React from "react";

const COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
];
function stringToNumber(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}
function getColor(name) {
  const number = stringToNumber(name);
  const color = COLORS[number % COLORS.length];
  return color;
}
function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "?";
}

const ProfileDp = ({name}) => {
//   const name = "r";
    console.log(name)
  const bgColor = getColor(name);
  const initial = getInitial(name);
  return (
    <div
      style={{
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // color: "white",
        fontWeight: "bold",
        fontSize: 20,
      }}
      className={"text-gray-300"}
    >
      {initial}
    </div>
  );
};

export default ProfileDp;
