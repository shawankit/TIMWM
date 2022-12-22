import PropTypes from "prop-types";

// import "prismjs/components/prism-clike";
import { highlight } from "prismjs/components/prism-core";
const Prism = require("prismjs");
// import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import Editor from "react-simple-code-editor";

const CodeEditor = ({
  height = "h-76",
  width = "w-full",
  border = "border ",
  borderColor = "border-gray-200",
  padding = "p-1.5",
  defaultValue,
  onChange,
  error,
  disabled,
}) => {
  // const [code, setCode] = useState(defaultValue);

  // useEffect(() => {
  //   onChange(code);
  // }, [code]);
  const onValueChange = (code) => {
    // setCode(editorState);
    onChange(code);
  };
  return (
    <>
      <div
        className={`${width} ${height} ${border} ${borderColor} ${padding} overflow-y-auto mb-6`}
      >
        <Editor
          disabled={disabled}
          value={defaultValue}
          onValueChange={(code) => onValueChange(code)}
          highlight={(code) => highlight(code, Prism.languages.html, "html")}
          padding={10}
          textareaClassName="outline-0"
          style={{
            fontSize: 16,
            opacity: disabled ? 0.5 : 1,
          }}
        />
      </div>
      {error && (
        <div className="text-sm text-error mb-2">
          {error.length != 0 && error.message}
        </div>
      )}
    </>
  );
};

export default CodeEditor;

CodeEditor.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  padding: PropTypes.string,
};
