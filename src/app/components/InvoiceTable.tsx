"use client";
import Invoices from "./Invoices";
import Pagination from "./Pagination";
import TableLoadingSkeleton from "./TableLoadingSkeleton";
import usePagination from "~/hooks/usePagination";
import useFetchInvoices from "~/hooks/useFetchInvoices";

export default function InvoiceTable({ type, userId, invoiceCount }: { type: "user" | "admin"; userId: string | undefined; invoiceCount: number }) {
  const { page, totalPages, incrementPage, decrementPage } = usePagination(invoiceCount);
  const { invoices, isInvoicesLoading } = useFetchInvoices(type, page, userId)!;

  if (isInvoicesLoading) return <TableLoadingSkeleton title="Invoices" />;
  if (invoices === undefined) throw new Error("Could not fetch invoices");

  return (
    <section className="flex flex-1 flex-col rounded-2xl bg-linear-gradient">
      <div className="flex h-[calc(100%-3px)] w-[calc(100%-3px)] flex-1 translate-x-[1.5px] translate-y-[1.5px] flex-col gap-2 rounded-2xl bg-radial-gradient p-5">
        <h2 className="p-2 text-2xl">Invoices</h2>

        <Invoices invoices={invoices} page={page} invoiceCount={invoiceCount} />

        {invoiceCount !== 0 ? (
          <>
            <div className="flex-1"></div>
            <Pagination page={page} decrementPage={decrementPage} incrementPage={incrementPage} totalPages={totalPages} />
          </>
        ) : null}
      </div>
    </section>
  );
}
