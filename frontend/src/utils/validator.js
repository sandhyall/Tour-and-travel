export const validateBookingForm = (
  form,
  selectedPackage,
  paymentMethod,
  bankSlip
) => {
  if (!selectedPackage) {
    return "Please select package";
  }

  if (!form.travelDate) {
    return "Please select travel date";
  }

  if (
    !form.buyer.firstName ||
    !form.buyer.lastName ||
    !form.buyer.email
  ) {
    return "Please fill buyer information";
  }

  for (let p of form.participants) {
    if (
      !p.firstName ||
      !p.lastName ||
      !p.email ||
      !p.phone ||
      !p.gender ||
      !p.dob ||
      !p.nationality ||
      !p.passportNumber
    ) {
      return "Please fill all traveler fields";
    }
  }

  if (
    paymentMethod ===
      "swift_bank_transfer" &&
    !bankSlip
  ) {
    return "Please upload bank slip";
  }

  return null;
};