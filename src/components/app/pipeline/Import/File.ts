
type FileTypes = 'CSV' | 'TSV' | 'TXT';

interface FileReaderConfig {
  type: FileTypes;
  header: boolean;
}

export class PFileReader {
  file: File;
  header: boolean;
  type: FileTypes;

  constructor(file: File, config: FileReaderConfig) {
    this.file = file;
    this.header = config.header || true;
    this.type = config.type || 'TXT';
  }

  readFile(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function(evt: any) {
        console.log('Reading file');
        if (evt.target.readyState === 2) { // DONE == 2
          const data = evt.target.result;
          resolve(this.csvParser(data));
        } else {
          reject({
            message: 'There was an error when uploading file'
          });
        }
      }.bind(this);

      const blob = this.file.slice();
      reader.readAsBinaryString(blob);
    })
  }

  csvParser(content) {
    const rows = content.split('\n');
    const seperate = row => row.split(',');

    return {
      header: rows.slice(0, 1).map(seperate),
      body: rows.slice(1, -1).map(seperate),
    };
  }
}
