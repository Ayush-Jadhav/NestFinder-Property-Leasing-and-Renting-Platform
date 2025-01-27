import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: "0",
        zIndex: "1000",
        display: "grid",
        placeItems: "center",
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "350px",
          borderRadius: "8px",
          border: "1px solid #2c2c2c",
          backgroundColor: "#1a1a1a",
          padding: "24px",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#e5e5e5",
          }}
        >
          {modalData?.text1}
        </p>
        <p
          style={{
            marginTop: "12px",
            marginBottom: "20px",
            lineHeight: "1.6",
            color: "#bfbfbf",
          }}
        >
          {modalData?.text2}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            style={{
              // cursor: "pointer",
              // borderRadius: "6px",
              // backgroundColor: "#bfbfbf",
              // padding: "8px 20px",
              // fontWeight: "600",
              // color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: "600",
              fontSize: "1rem",
            }}
            onClick={modalData?.btn2Handler}
            >
              {modalData?.btn2Text}
          {/* <IconBtn
          /> */}
            
          </button>
        </div>
      </div>
    </div>
  );
}
