import type { Metadata } from "next";
import BulkLabelCreation from "./components/BulkLabelCreation";
import SingleLabelCreation from "./components/SingleLabelCreation";
import Divider from "~/app/components/Divider";

export const metadata: Metadata = {
  title: "Create Labels | Proglo Shipping",
  description: "Generated by create next app",
};

export default function CreateLabels() {
  return (
    <>
      <BulkLabelCreation />
      <Divider />
      <SingleLabelCreation />
    </>
  );
}
