import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./modal";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import {  toast } from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("Invalid Email").required("Email is Required"),
});
const AddAndUpdateContact = ({ isOpen, onClose, isUpdate,contact }) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success(" Contact Added Sucessfully")
    } catch (error) {
      console.warn(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues = { isUpdate ? {
            name: contact.name,
            email: contact.email,

          } : {

            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            console.warn(values);
            isUpdate ?
            updateContact(values, contact.id) :
            addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-red-700">
                <ErrorMessage  name="name" />
              </div>
            </div>
            <div className="flex flex-col gap1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
               <div className="text-red-700">
                <ErrorMessage  name="email" />
              </div>
            </div>
            <button className="self-end border bg-amber-600 px-4 py-2">
            {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
