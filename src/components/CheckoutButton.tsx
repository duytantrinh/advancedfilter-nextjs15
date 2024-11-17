import { useClearCart } from "@/hooks/cart";
import { Button } from "./ui/button";
import React, { Dispatch, SetStateAction } from "react";

import { redirect } from "next/navigation";

type Props = {
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CheckoutButton({ setSheetOpen }: Props) {
  const clearCart = useClearCart();

  function handleCheckout() {
    clearCart.mutate();
    setSheetOpen(false);
    redirect("/thankyou");
  }

  return <Button onClick={handleCheckout}>Checkout</Button>;
}
