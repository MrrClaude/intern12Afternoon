import React, { useState } from 'react'
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Globe,
  Hash,
  Trash2,
  UserPlus,
  Users,
  Home,
  // ChevronUp,
  // ChevronDown,
  // Pencil,
  // X,
  // Check,
} from "lucide-react";
import { Label, TextInput, Select, Alert, } from "flowbite-react";
import { Button } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalBody, ModalHeader, } from "flowbite-react";
import { AlertCircle } from "lucide-react";
import IntlTelInput from "@intl-tel-input/react";
import "intl-tel-input/styles";
const App = () => {


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    nationality: "",
    location: "",
    address: "",
  });

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      dateOfBirth: "",
      gender: "",
      phone: "",
      nationality: "",
      location: "",
      address: "",
    });
    setEditIndex(null);
  };

  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;

    }

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = formData;
      setRecords(updatedRecords);
      setSuccessMessage("Record updated successfully!");
      setEditIndex(null);
    } else {
      setRecords([...records, formData]);
      setSuccessMessage("Record saved successfully!");
    }
    clearForm();
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  const confirmDelete = () => {
    handleDelete(deleteIndex);
    setOpenModal(false);
    setDeleteIndex(null);

  }

  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditIndex(index);
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (formData.age < 1 || formData.age > 120) {
      newErrors.age = "Age must be between 1 and 120.";
    }
    if (!formData.phone.startsWith("0")) {
      newErrors.phone = "Phone number must start with 0.";
    } else if (formData.phone.length !== 9 && formData.phone.length !== 10) {
      newErrors.phone = "Phone number must contain 9 or 10 digits.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = "Nationality is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  return (
    <>
      <div className="w-screen min-h-screen bg-background flex flex-col ">
        <main className="flex-1 w-full px-6 py-6 space-y-6">
          <AnimatePresence>
            {Object.keys(errors).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert color="failure">
                  <span className="font-medium">
                    Please fix the following errors:
                  </span>

                  <ul className="mt-2 list-disc list-inside">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert color="success">
                  <span className="font-medium">Success!</span>
                  {" "}{successMessage}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
          <section className="w-full bg-card rounded-xl  border border-black/20  shadow-sm overflow-hidden">
            <div className="border-b border-b-black/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* <UserPlus className="w-4 h-4 text-accent" /> */}
                <h2 className="text-sm font-semibold text-foreground">Add New Record</h2>
              </div>
              <span className="text-xs text-muted-foreground">All fields required</span>
            </div>
            <form className=" p-6" onSubmit={handleSave}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="firstName" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"> <User className="w-3.5 h-3.5" />FIRST NAME</Label>
                  </div>
                  <TextInput id="firstName" value={formData.firstName} onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

                    setFormData({
                      ...formData,
                      firstName: value,
                    });
                  }} type="text" sizing="sm" placeholder="First Name" required />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="lastName" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><User className="w-3.5 h-3.5" />LAST NAME</Label>
                  </div>
                  <TextInput id="lastName" value={formData.lastName} onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

                    setFormData({
                      ...formData,
                      lastName: value,
                    });
                  }} type="text" sizing="sm" placeholder="Last Name" required />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="email" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><Mail className="w-3.5 h-3.5" />EMAIL</Label>
                  </div>
                  <TextInput id="email" value={formData.email} onChange={handleChange} type="email" sizing="sm" placeholder="name@gmail.com" required />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="age" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><Hash className="w-3.5 h-3.5" />AGE</Label>
                  </div>
                  <TextInput id="age" value={formData.age} onChange={handleChange} type="number" sizing="sm" placeholder="Age" required />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"> <Calendar className="w-3.5 h-3.5" />DATE OF BIRTH</Label>
                  </div>
                  <TextInput id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} type="date" sizing="sm" placeholder="Date of birth" required />
                </div>

                <div className="mb-2 block">
                  <Label htmlFor="gender" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><User className="w-3.5 h-3.5" />Gender</Label>

                  <Select id="gender" value={formData.gender} onChange={handleChange} required sizing="sm" >
                    <option >Select Your Gender </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>

                  </Select>
                </div>
                <div>
                  <button>ben</button>
                  <button>ben2</button>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      <Phone className="w-3.5 h-3.5" />PHONE
                    </Label>
                  </div>
                  <IntlTelInput
                    className="iti-custom"
                    initialCountry="kh"
                    loadUtils={() => import("intl-tel-input/utils")}
                    onChangeNumber={(number) => setFormData({ ...formData, phone: number })}
                    inputProps={{
                      id: "phone",
                      required: true,
                      className:
                        "w-full text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:ring-primary-500 py-1.5 pl-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400",
                      placeholder: "012 345 678",
                    }}
                  />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="nationality" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"> <Globe className="w-3.5 h-3.5" />NATIONALITY</Label>
                  </div>
                  <TextInput id="nationality" value={formData.nationality} onChange={handleChange} type="text" sizing="sm" placeholder="Nationality" required />
                </div>
                <div >
                  <div className="mb-2 block">
                    <Label htmlFor="location" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><MapPin className="w-3.5 h-3.5" />LOCATION</Label>
                  </div>
                  <TextInput id="location" value={formData.location} onChange={handleChange} type="text" sizing="sm" placeholder="Location" required />
                </div>
                <div ></div>
                <div className="mb-2 block col-span-full">
                  <Label htmlFor="comment" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider"><Home className="w-3.5 h-3.5" />Address</Label>

                  <TextInput id="address" value={formData.address} onChange={handleChange} type="text" sizing="sm" placeholder="Address" required />
                </div>

              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button size="xs" type="submit" className="cursor-pointer"><UserPlus className="w-4 h-4 " />{editIndex !== null ? "Update Record" : "Save Record"}</Button>
                <Button size="xs" color="light" type="button" onClick={clearForm} className="hover:bg-red-500 hover:text-white cursor-pointer" >
                  <Trash2 className="w-4 h-4  " />Clear Form
                </Button>
              </div>
            </form>

          </section>
          <section className="w-full bd-card rounded-xl border border-black/20  shadow-sm overflow-hidden">
            <div className="border border-black/20 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">Stored Records</h2>
              </div>
              <span className="text-xs text-muted-foreground" >
                {records.length} entr{records.length !== 1 ? "ies" : "y"}
              </span>
            </div>
            <div className="w-full overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow >
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell>FIRST NAME</TableHeadCell>
                    <TableHeadCell>LAST NAME</TableHeadCell>
                    <TableHeadCell>AGE</TableHeadCell>
                    <TableHeadCell>GENDER</TableHeadCell>
                    <TableHeadCell>DOB</TableHeadCell>
                    <TableHeadCell>PHONE</TableHeadCell>
                    <TableHeadCell>EMAIL</TableHeadCell>
                    <TableHeadCell>NATIONALITY</TableHeadCell>
                    <TableHeadCell>LOCATION</TableHeadCell>
                    <TableHeadCell>ADDRESS</TableHeadCell>
                    <TableHeadCell>ACTION</TableHeadCell>
                    <TableHeadCell>
                      <span className="sr-only">Edit</span>
                    </TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody className="divide-y">
                  {records.map((record, index) => (
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{record.firstName}</TableCell>
                      <TableCell>{record.lastName}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.gender}</TableCell>
                      <TableCell>{record.dateOfBirth}</TableCell>
                      <TableCell>{record.phone}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.nationality}</TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell>{record.address}</TableCell>
                      <TableCell className="flex items-center gap-4">
                        <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => handleEdit(index)}>
                          Edit
                        </button>
                        <button className="font-medium  text-red-500 hover:underline dark:text-primary-500" onClick={() => { setDeleteIndex(index); setOpenModal(true); }}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Modal
                          show={openModal}
                          size="md"
                          popup
                          onClose={() => setOpenModal(false)}
                        >
                          <ModalHeader />
                          <ModalBody>
                            <div className="text-center">
                              <AlertCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this record?
                              </h3>

                              <div className="flex justify-center gap-4">
                                <Button color="red" onClick={confirmDelete}>
                                  Yes, I'm sure
                                </Button>

                                <Button
                                  color="alternative"
                                  onClick={() => setOpenModal(false)}
                                >
                                  No, cancel
                                </Button>
                              </div>
                            </div>
                          </ModalBody>
                        </Modal>
                      </TableCell>

                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </div>

          </section>
        </main>
      </div>
    </>
  )
}

export default App
