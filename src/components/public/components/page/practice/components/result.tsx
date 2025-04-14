import { useState } from "react";
import AssignmentHistory from "./assignment-history";
import CurrentResult from "./current-result";

function Result() {
  const [tabResult, setTabResult] = useState("current_result");
  return (
    <div>
      <div className="mt-6">
        <h3 className="text-white text-2xl font-semibold">Test results</h3>
        <div className="flex items-center gap-4 bg-[#230e58] rounded-[10px] p-2 mt-4">
          <h3
            className="text-white cursor-pointer"
            onClick={() => setTabResult("current_result")}
          >
            Current results
          </h3>
          <h3
            className="text-white cursor-pointer"
            onClick={() => setTabResult("assignment_history")}
          >
            Assignment history
          </h3>
        </div>

        <div>
          {tabResult === "current_result" ? (
            <CurrentResult />
          ) : (
            <AssignmentHistory />
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
