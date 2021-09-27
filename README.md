<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">YouTube Viewer</h3>
  <p align="center">
    <img src="https://user-images.githubusercontent.com/72695696/134879629-7c0e7a52-c5b3-484c-b774-82290cf00e9b.png">
  </p>
  <p align="center">
    View YouTube videos not on YouTube!
    <br/>
    <br/>
    <br/>
    <a href="https://github.com/askozyra/yt_viewer/issues">Report Bug</a>
    •
  <a href="https://github.com/askozyra/yt_viewer/pulls">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![][project-sc]

Originally the idea of the project was a repetition of [SyncTube](https://sync-tube.de). My goal was to learn how WebSockets work, but I haven't figure out how to test this for multiple users at the same time on a localhost. So I decided to stay with a simple viewer.

Obviously the design was taken from SyncTube.

### Built With

* [YT Iframe Player API](https://developers.google.com/youtube/iframe_api_reference)
* [YT Data API v3](https://console.cloud.google.com/apis)



<!-- GETTING STARTED -->
## Getting Started

Get the project:
  ```sh
  git clone https://github.com/askozyra/yt_viewer
  ```

### Prerequisites

* [composer](https://getcomposer.org/download/)
* [PHP 8.0](https://www.php.net/releases/8.0/ru.php)

### Installation

1. Get a YT Data API Key at https://console.cloud.google.com/apis

2. Install composer dependencies:
  ```sh
  composer install
  ```

3. Enter your token in `.env`
   ```env
   API_KEY='TOKEN';
   ```



<!-- USAGE EXAMPLES -->
## Usage

Copy URL of the YT video and paste it in special field on top. If link validation was successfull, you will see preview of the video, its title and author. When you click on it, the video will start or be added to the queue. When the video ends, if the queue is not empty, the next one will be loaded and played automatically. Videos in the queue can be swapped or removed from the queue.



<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

Email: khnu2019@gmail.com

LinkedIn: [askozyra](https://linkedin.com/in/askozyra)

Project Link: [https://github.com/askozyra/yt_viewer][project-url]


<!-- MARKDOWN LINKS & IMAGES -->
[project-url]: https://github.com/askozyra/yt_viewer
[project-sc]: https://user-images.githubusercontent.com/72695696/134815141-6d709b52-29d3-4608-886c-41bad14567c4.png
[project-ico]: https://user-images.githubusercontent.com/72695696/134879629-7c0e7a52-c5b3-484c-b774-82290cf00e9b.png
