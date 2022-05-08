import { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const App: FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const firstDayOfMonth = dayjs().month(currentMonth).date(1);

  const firstDayOfCalendar = firstDayOfMonth.subtract(
    firstDayOfMonth.day(),
    "day"
  );

  const daysOfCalendar = new Array(42)
    .fill("")
    .map((_, index) => firstDayOfCalendar.add(index, "day"));

  const groupedDays = daysOfCalendar.reduce((acc, current, index) => {
    if (!acc[Math.floor(index / 7)]) acc[Math.floor(index / 7)] = [];
    acc[Math.floor(index / 7)].push(current);
    return acc;
  }, [] as Dayjs[][]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[95vw] max-w-[500px]">
        <div className="flex justify-between">
          <h1 className="text-[#0d90f3]">
            {dayjs().month(currentMonth).format("MMM")} {currentYear}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const added = dayjs()
                  .month(currentMonth)
                  .year(currentYear)
                  .subtract(1, "month");
                setCurrentMonth(added.month());
                setCurrentYear(added.year());
              }}
            >
              &lt;
            </button>
            <button
              onClick={() => {
                const added = dayjs()
                  .month(currentMonth)
                  .year(currentYear)
                  .add(1, "month");
                setCurrentMonth(added.month());
                setCurrentYear(added.year());
              }}
            >
              &gt;
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <td>Sun</td>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
            </tr>
          </thead>
          <tbody>
            {groupedDays.map((group) => (
              <tr key={group[0].toString()}>
                {group.map((day) => (
                  <td
                    key={day.toString()}
                    className={
                      day.month() === currentMonth
                        ? "text-white"
                        : "text-gray-500"
                    }
                  >
                    {day.format("D")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
