export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  const buttonStyle = outline
    ? {
        border: "1px solid #F1C40F", // yellow-50
        backgroundColor: "transparent",
        color: "#F1C40F", // yellow-50
      }
    : {
        backgroundColor: "#F1C40F", // yellow-50
        color: "#1A1A1A", // richblack-900
      };


  return (
    <button
      disabled={disabled}
      onClick={onclick}
      style={{
        ...buttonStyle,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "600",
        fontSize: "1rem",
        ...customClasses,
      }}
      type={type}
    >
      {children ? (
        <>
          <span style={outline ? { color: "#F1C40F" } : {}}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
