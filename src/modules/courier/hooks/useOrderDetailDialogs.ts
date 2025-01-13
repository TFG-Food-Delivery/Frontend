import { useState } from "react";
import { NavigateFunction } from "react-router";
import { useAcceptOrder } from "./useAcceptOrder";
import { usePickUpOrder } from "./usePickUpOrder";
import { useVerifyPin } from "./useVerifyPin";
import { useGetCustomer } from "../../common/hooks";
import { Order } from "../../common/types";

export const useOrderDialogs = (order: Order, courierId: string, navigate: NavigateFunction) => {
    const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
    const [openPickUpDialog, setOpenPickUpDialog] = useState(false);
    const [openDeliverDialog, setOpenDeliverDialog] = useState(false);
    const [pin, setPin] = useState<string>("");
    const [errorDeliverDialog, setErrorDeliverDialog] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState<any | null>(null);

    const handleConfirmAccept = async () => {
        if (order.id && courierId) {
            await useAcceptOrder(order.id, courierId);
            window.location.reload();
        }
        setOpenAcceptDialog(false);
    };

    const handleConfirmPickUp = async () => {
        if (order) {
            await usePickUpOrder(order.id);
            const customerDataReceived = await useGetCustomer(order.customerId);

            setCustomerData(customerDataReceived);
        }
        setOpenPickUpDialog(false);
    };

    const handleConfirmDeliver = async () => {
        if (!order.id) return;

        const isPinValid = await useVerifyPin(pin, order.id);
        if (isPinValid) {
            setOpenDeliverDialog(false);
            navigate("/dashboard");
        } else {
            setErrorDeliverDialog("El PIN es incorrecto");
        }
    };

    return {
        openAcceptDialog,
        setOpenAcceptDialog,
        openPickUpDialog,
        setOpenPickUpDialog,
        openDeliverDialog,
        setOpenDeliverDialog,
        pin,
        setPin,
        errorDeliverDialog,
        handleConfirmAccept,
        handleConfirmPickUp,
        handleConfirmDeliver,
        customerData,
    };
};
