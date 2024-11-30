![License](https://img.shields.io/badge/License-MIT-blue) ![Release](https://img.shields.io/badge/Release-1.7.0-brightgreen) ![Development](https://img.shields.io/badge/Development-1.7.0-blue.svg)


# 🌸 HiAnime Ad Blocker

![Banner](https://github.com/Pekadii/HiAnimeAdBlocker/blob/main/Images/Banner.png)

The HiAnime Ad Blocker extension is designed specifically for enhancing the browsing experience on HiAnime and similar streaming sites. It automatically detects and blocks redirect links, closes unwanted tabs, and hides intrusive ads to provide a smoother, distraction-free viewing experience.

> [!IMPORTANT]
>
> # Not Official Release a ( KEY ) is required.

> [!NOTE]
>
> This Ad Blocker auto-detects redirect URL links and auto-closes tabs.



# Browser Support

| <a href="https://www.google.com/chrome/"><img src="./logos/chrome.svg" width="42px" /><br /><span>Chrome</span></a> | <a href="https://www.microsoft.com/edge"><img src="./logos/edge.svg" width="42px" /><br /><span>Edge</span></a> | <a href="https://www.opera.com/"><img src="./logos/opera.svg" width="42px" /><br /><span>Opera</span></a> | <a href="https://www.opera.com/gx"><img src="./logos/operagx.svg" width="42px" /><br /><span>Opera GX</span></a> |
| ---- | ---- | ---- | ---- |



## Errors
> [!CAUTION]
> Please notify of bugs you encounter or like changes in the Ad Blocker.


## Goal

The goal is to watch HiAnime without unwanted ads or pop-ups.

## Features:

- Auto Tab Closing: Detects and closes redirect pop-up tabs to prevent interruptions.
  
- Customizable Allowed Domains: Maintains a list of allowed domains (e.g., discord.com, github.com) to prevent unnecessary blocking on trusted sites.
  
- Ad Blocking Rules: Blocks various ad resources (scripts, images, etc.) from known ad domains, enhancing load times and privacy.
  
- Hide Pop-ups and Overlays: Conceals overlays, modals, and banners commonly used for ads.
  
- URL Monitoring: Monitors page changes (hash change, popstate) and DOM mutations to detect and block ads dynamically.
  
- Multi-Browser Compatibility: Primarily designed for Chrome, Opera, and other


## Bug Fixes:

- Fix service worker (inactive) error, only when developer mode is active in "extension" to see the error.
- Fix "Allowed domains list" comes with default domains cause of the "service worker (inactive) error".


## Changelog:

Version 1.7.0

Changes:

- Feature Enhancements

## Step 1: Download the Repository
1. Clone or download the repository from GitHub to your local machine.
   ```bash
   git clone https://github.com/Pekadii/HiAnimeAdBlocker.git

## Step 2: Load as an Unpacked Extension
1. Open Chrome (or Opera) and navigate to chrome://extensions/ or opera://extensions/.
2. Enable Developer mode by toggling the switch in the top right corner.
3. Click Load unpacked and select the directory where you downloaded this extension.

## Step 3: Grant Permissions
3. Upon loading, you may need to grant the requested permissions to ensure proper ad-blocking functionality across domains.

### Usage Notes
This extension works specifically on HiAnime and a few other domains.
Domains that are permitted by default include:
- hianime.to
- discord.com
- github.com
- addons and YouTube pages

### Editing the Allowed Domains
To customize the list of allowed domains:

Open background.js.
Modify the allowedDomains array to include or exclude domains as desired.

![Domain](https://github.com/Pekadii/HiAnimeAdBlocker/blob/main/Images/Domains.png)

![Logo](https://github.com/Pekadii/HiAnimeAdBlocker/blob/main/Images/logo.png)

## Screenshots

![Ad Blocker Screenshot](https://github.com/Pekadii/HiAnimeAdBlocker/blob/main/Images/HiAnime.png)
![Ad Blocker Screenshot](https://github.com/Pekadii/HiAnimeAdBlocker/blob/main/Images/HiAnime-Home.png)


