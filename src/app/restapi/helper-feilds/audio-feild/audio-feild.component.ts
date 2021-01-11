import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { FieldType } from '@ngx-formly/core';
@Component({
  selector: 'app-audio-feild',
  templateUrl: './audio-feild.component.html',
  styleUrls: ['./audio-feild.component.scss']
})
export class AudioFeildComponent extends FieldType implements OnInit {

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }
  // Lets initiate Record OBJ
   record:any;
  // Will use this flag for detect recording
   recording = false;
  // Url of Blob
   url;
   error;
   audioEnable=true;
  ngOnInit(): void {
      if(!navigator.mediaDevices){
        this.audioEnable=false;
      }
      this.url=this.model[this.key.toString()];
  }

  sanitize(url: string) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {
    this.clear();
      this.recording = true;
      const mediaConstraints = {
          video: false,
          audio: true
      };



if (typeof navigator.mediaDevices.getUserMedia === 'undefined') {
    navigator.getUserMedia({
        audio: true
    }, this.successCallback.bind(this), this.errorCallback.bind(this));
} else {
    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(this.successCallback.bind(this)).catch(this.errorCallback.bind(this));
}
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
      const options = {
          mimeType: 'audio/wav',
          numberOfAudioChannels: 1
      };
      // Start Actual Recording
      const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
      this.record = new StereoAudioRecorder(stream, options);
      this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
      this.recording = false;
      this.record.stop(this.processRecording.bind(this));
  }

  async  processRecording(blob) {
     this.url=(await this.readFileAsync(this.blobToFile(blob, this.key+'.mp3')));
     this.model[this.key.toString()]=this.url;
  }
  readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    })
  }
  public blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    b.blob=theBlob;
    // Cast to a File() type
    return theBlob as File;

}
  /**
   * Process Error.
   */
  errorCallback(error) {
      this.error = 'Can not play audio in your browser';
  }
  clear(){
    this.record=null;
  // Will use this flag for detect recording
   this.recording = false;
  // Url of Blob
   this.url=null;
   delete this.model[this.key.toString()];
  }
}
