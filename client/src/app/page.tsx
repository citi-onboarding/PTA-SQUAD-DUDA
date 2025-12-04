import { Suspense } from "react";
import AttendingsContent from "./atendings";

export default function Page() {
  return (
    <Suspense>
      <AttendingsContent />
    </Suspense>
  );
}
