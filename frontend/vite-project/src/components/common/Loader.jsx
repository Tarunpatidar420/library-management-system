function Loader({ text = "Loading..." }) {
  return (
    <div
      style={{
        minHeight: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "18px",
      }}
    >
      {text}
    </div>
  );
}

export default Loader;