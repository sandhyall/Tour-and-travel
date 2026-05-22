export const validateBookingForm = (
  form,
  selectedPackage,
  paymentMethod,
  bankSlip
) => {
  // 1. Package & Date Validation
  if (!selectedPackage) {
    return "Please select a package";
  }

  // form सुरक्षित छ कि छैन हेर्न ?. थपिएको
  if (!form?.travelDate) {
    return "Please select a travel date";
  }

  // 2. Buyer Validation
  if (!form?.buyer?.firstName?.trim()) return "Please enter the buyer's first name";
  if (!form?.buyer?.lastName?.trim()) return "Please enter the buyer's last name";
  if (!form?.buyer?.email?.trim()) return "Please enter the buyer's email address";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.buyer.email.trim())) {
    return "Please enter a valid buyer email address";
  }

  // 3. Participants / Travelers Validation
  if (!form?.participants || form.participants.length === 0) {
    return "Please add at least one traveler";
  }

  for (let i = 0; i < form.participants.length; i++) {
    const p = form.participants[i];
    const travelerNum = i + 1;

    if (!p.firstName?.trim()) return `Traveler #${travelerNum}: First name is required`;
    if (!p.lastName?.trim()) return `Traveler #${travelerNum}: Last name is required`;
    
    if (!p.email?.trim()) {
      return `Traveler #${travelerNum}: Email address is required`;
    } else if (!emailRegex.test(p.email.trim())) {
      return `Traveler #${travelerNum}: Please enter a valid email address`;
    }

    if (!p.phone?.trim()) return `Traveler #${travelerNum}: Phone number is required`;
    if (!p.gender) return `Traveler #${travelerNum}: Please select a gender`;
    if (!p.dob) return `Traveler #${travelerNum}: Date of birth is required`;
    if (!p.nationality?.trim()) return `Traveler #${travelerNum}: Nationality is required`;
    if (!p.passportNumber?.trim()) return `Traveler #${travelerNum}: Passport / ID number is required`;
  }

  // 4. Payment Verification
  if (paymentMethod === "swift_bank_transfer" && !bankSlip) {
    return "Please upload your bank transfer slip to complete the booking";
  }

  return null;
};