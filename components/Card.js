import CountUp from "react-countup";

const Card = ({ icon, value, name, bgColor, color }) => {
  return (
    <div
      className="p-4 flex-1 min-w-[15rem] rounded-lg shadow-lg"
      style={{ background: bgColor, color: color }}
    >
      <div className="mb-[1rem]">{icon}</div>
      <div className="">
        <h3 className="text-[2rem] font-semibold mb-[-0.5rem]">
          <CountUp end={value} separator="," decimal="," />
        </h3>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default Card;
