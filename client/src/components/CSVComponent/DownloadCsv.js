import moment from "moment";
import { useCSVDownloader } from "react-papaparse";

export default function DownloadCsv({
  sampleData,
  fileName,
  children,
}) {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      variant="Link"
      type={Type.Button}
      filename={fileName}
      bom={true}
      config={{
        delimiter: ",",
      }}
      data={sampleData}
    >
      {children}
    </CSVDownloader>
  );
}
