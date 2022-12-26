import moment from "moment";
import { useCSVDownloader } from "react-papaparse";

export default function DownloadCsv({
  sampleData,
  fileName,
  children,
  page
}) {
  const { CSVDownloader, Type } = useCSVDownloader();
  const getFileName = () => `${page}-sample-file`;

  return (
    <CSVDownloader
      variant="Link"
      type={Type.Button}
      filename={getFileName()}
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
