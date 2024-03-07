"use client";
import { type FormEvent, useState } from "react";
import { api } from "~/trpc/react";
import useCreateLabels from "~/utils/createLabels";
import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";
import PackageDimensionForm from "./PackageDimensionForm";

export default function SingleLabelCreation() {
  const initialState = {
    FromCountry: "United States",
    FromName: "",
    FromCompany: "",
    FromPhone: "",
    FromStreet: "",
    FromStreet2: "",
    FromCity: "",
    FromZip: "",
    FromState: "",
    ToCountry: "United States",
    ToName: "",
    ToCompany: "",
    ToPhone: "",
    ToStreet: "",
    ToStreet2: "",
    ToCity: "",
    ToZip: "",
    ToState: "",
    Length: "",
    Height: "",
    Width: "",
    Weight: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [price, setPrice] = useState("0.00");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { createLabels, storeData } = useCreateLabels();

  const handleChange = (fields: Partial<typeof formData>) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const updateWeight = (value: string) => {
    setFormData((prev) => {
      return { ...prev, Weight: value };
    });
    switch (true) {
      case 0 < parseInt(value) && parseInt(value) <= 7.99:
        setPrice("5.50");
        break;
      case 8 <= parseInt(value) && parseInt(value) <= 14.99:
        setPrice("11.00");
        break;
      case 15 <= parseInt(value) && parseInt(value) <= 24.99:
        setPrice("11.50");
        break;
      case 25 <= parseInt(value) && parseInt(value) <= 34.99:
        setPrice("12.00");
        break;
      case 35 <= parseInt(value) && parseInt(value) <= 44.99:
        setPrice("12.50");
        break;
      case 45 <= parseInt(value) && parseInt(value) <= 54.99:
        setPrice("12.50");
        break;
      case 55 <= parseInt(value) && parseInt(value) <= 70.0:
        setPrice("12.50");
        break;
      default:
        setPrice("0.00");
    }
  };

  const updateBalance = api.balance.update.useMutation();

  const balance = api.balance.getAmount.useQuery();

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!balance.data?.amount) return;
    if (parseFloat(price) === 0) return;
    if (formData.FromStreet === formData.ToStreet) {
      setErrorMessage("Sender Address cannot be the same as Recipient Address.");
      return;
    }
    if (parseFloat(balance.data?.amount) < parseFloat(price)) {
      setErrorMessage("Insufficient funds. Please add more to your balance.");
      return;
    }
    const apiResponse = await createLabels([formData]);
    if (apiResponse instanceof Error) {
      setErrorMessage(`${JSON.stringify(apiResponse)}`);
      return;
    }
    const { tracking, links } = apiResponse;
    storeData(tracking, links, [formData], [price]);
    setPrice("0.00");
    setFormData(initialState);
    const newBalance = parseFloat(balance.data.amount) - parseFloat(price);
    updateBalance.mutate({ amount: newBalance.toString() });
    setErrorMessage("");
    router.push("/user/dashboard");
    router.refresh();
  };

  return (
    <>
      <h1 className="pl-2 text-4xl">Create Single Label</h1>
      <form onSubmit={(e) => onFormSubmit(e)} className="grid grid-cols-2 grid-rows-[1fr_auto] gap-6">
        <AddressForm label="From" handleChange={handleChange} formData={formData} />
        <AddressForm label="To" handleChange={handleChange} formData={formData} />
        <PackageDimensionForm handleChange={handleChange} formData={formData} updateWeight={updateWeight} errorMessage={errorMessage} price={price} />
      </form>
    </>
  );
}
