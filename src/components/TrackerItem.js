import React, { useState, useContext } from "react";
import trashIcon from "../images/trash-svgrepo-com.svg";
import editIcon from "../images/edit-svgrepo-com.svg";
import "./TrackerItem.css";
import { useHttpClient } from "../util/http-hook";
import { useNavigate } from "react-router";
import TrackerHistory from "./TrackerHistory";
import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import { AuthContext } from "../util/auth-context";

export default function Tracker(props) {
  const trackerId = props.id;
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  const netColor = {
    color: props.net > 0 ? "#2ecc71" : "#c0392b",
  };

  function handleEditBtn() {
    navigate(`/update-tracker/${trackerId}`, { replace: true });
  }

  function handleAddTransactionBtn() {
    navigate(`/add-transaction/${trackerId}`, { replace: true });
  }

  async function submitDelete() {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/trackers/${trackerId}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${auth.token}` }
      );
      props.onDelete(props.id);
      window.location.reload();
    } catch (err) {}
  }

  function toggleDeleteModal() {
    setShowConfirmModal((prevState) => {
      return !prevState;
    });
  }

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={toggleDeleteModal}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <div style={{ display: "flex" }}>
              <Button inverse onClick={toggleDeleteModal}>
                CANCEL
              </Button>{" "}
              <Button danger onClick={submitDelete}>
                DELETE
              </Button>
            </div>
          </>
        }
      >
        <p>Are you sure you want to delete this?</p>
      </Modal>
      <div className="brm-container">
        <div className="top-right">
          <img
            className="del-btn"
            src={trashIcon}
            alt="trashcan"
            onClick={toggleDeleteModal}
          />
          <img
            className="edit-btn"
            src={editIcon}
            onClick={handleEditBtn}
            alt="pencil"
          />
        </div>

        <h1 className="site">{props.title}</h1>
        <h3>Current Balance</h3>
        <h1 className="balance">{props.currentBalance}</h1>

        <div className="inc-exp-container">
          <div>
            <h5>Deposits</h5>
            <p className="money minus">{props.deposit.toFixed(2)}</p>
          </div>
          <div>
            <h5>Withdrawals</h5>
            <p className="money plus">{props.withdrawals.toFixed(2)}</p>
          </div>
          <div>
            <h5>Net</h5>
            <p className="money" style={netColor}>
              {props.net.toFixed(2)}
            </p>
          </div>
        </div>
        <h3>Recent Transactions</h3>
        <ul id="list" className="list">
          <TrackerHistory trackerId={trackerId} />
        </ul>
        <button className="button" onClick={handleAddTransactionBtn}>
          Add Transaction
        </button>
      </div>
    </>
  );
}
