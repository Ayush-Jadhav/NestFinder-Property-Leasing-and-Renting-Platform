import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {deleteProfile} from "../../../Services/Operations/profileApi";
import { useState } from "react";
import "../pageStyle/DeleteAccount.css";
import ConfirmationModal from "../../ConfirmationModal";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <>
    <div className="delete-account-container">
      {/* <div className="icon-container">
      </div> */}
      <div className="delete-content-container">
        {/* <FiTrash2 className="trash-icon" /> */}
        <h2 className="delete-account-heading"><FiTrash2 className="trash-icon" />Delete Account</h2>
        <div className="delete-account-text">
          <p>Would you like to delete your account?</p>
          <p>
            Deleting your account is permanent and will remove all the content associated with it.
          </p>
        </div>
        <button
          type="button"
          className="delete-account-button"
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "Your account will be permanently deleted.",
              btn1Text: "Delete",
              btn2Text: "Cancel",
              btn1Handler: () => handleDeleteAccount(),
              btn2Handler: () => setConfirmationModal(null),
          })}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
