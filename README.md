# Child Safety Monitor

A web-based child safety monitoring system that detects unauthorized access to your device and alerts you with visual and audio indicators.

## Features

- **Real-time Access Detection**: Monitors device access using multiple detection methods
- **Visual Status Indicator**: Large circle that changes from green (normal) to red (dangerous)
- **Audio Alerts**: Plays alert sound when unauthorized access is detected
- **Test Sound Button**: Manual button to test the audio functionality
- **Activity Logging**: Real-time log of all detected activities
- **Auto-reset**: Automatically resets to normal state after 10 seconds of normal activity

## Detection Methods

The system uses multiple methods to detect unauthorized access:

1. **Page Visibility**: Detects when the page becomes hidden
2. **Window Focus**: Monitors when the window loses/gains focus
3. **User Activity**: Tracks mouse, touch, and keyboard activity
4. **Device Orientation**: Detects significant device movement
5. **Network Status**: Monitors online/offline status
6. **Inactivity Detection**: Alerts if no activity for 30 seconds

## Setup Instructions

### Single Device Setup (Original Method)

1. **Add Your Audio File**: Place your `music.mp3` file in the same directory as `index.html`
   - The system looks for `music.mp3` to play as the alert sound
   - You can use any MP3 file as your alert sound
   - If `music.mp3` is not found or doesn't work, the system will automatically use a built-in beep sound

2. **Open in Browser**: Open the HTML files in any modern web browser

3. **Grant Permissions**: When prompted, allow access to device sensors (orientation, etc.)

4. **Test Audio**: If you can't hear sound, open `audio-test.html` to diagnose audio issues

### Multi-Device Setup (New Feature)

The system now supports **real-time multi-device monitoring**! When someone accesses `access.html` on any device, it will trigger alerts on ALL connected devices.

#### Server Setup

1. **Install Dependencies**:
   ```bash
   cd child-safety-esp32
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Server will run on**: `http://localhost:3000` (or your external IP for network access)

#### Multi-Device Usage

1. **Start Server**: Run `npm start` in the project directory
2. **Open Monitoring Pages**: Open `index.html` on multiple devices/browsers
   - New devices start in "DANGEROUS" state (red)
   - Click "Reset Detection" to set to "NORMAL" (green)
   - Shows "X devices connected" counter
   - Connection status indicator in top-right corner
3. **Trigger Alert**: Open `access.html` on any device
   - ALL monitoring devices immediately show "DANGEROUS" status
   - All devices play alert sounds simultaneously
   - Real-time logs show which device triggered the alert

#### Testing Multi-Device Functionality

- **Test Page**: Open `test-multi-device.html` for testing without using access.html
- **Manual Testing**: Use the "Trigger Test Alert" button to test multi-device communication
- **Multiple Tabs**: Open multiple browser tabs to simulate multiple devices

#### Network Access

- **Local Network**: Other devices on your network can access via `http://YOUR_IP:3000`
- **Internet Access**: Deploy to a web server for internet-wide monitoring
- **Auto-Reconnect**: Devices automatically reconnect if connection is lost

## Two-Page System

This system consists of two separate pages that work together:

### 🔗 **Link 1: Monitoring Page** (`index.html`)
- **Purpose**: Main monitoring interface that shows the current security status
- **Features**: Real-time monitoring, visual status indicator, audio alerts
- **Use**: Keep this page open to monitor for unauthorized access

### 🔗 **Link 2: Access Trigger Page** (`access.html`)
- **Purpose**: When someone opens this page, it triggers a "DANGEROUS" alert on the monitoring page
- **Features**: Automatically sends alert to monitoring page, shows warning message
- **Use**: Share this link with others or use it to test the alert system

## How It Works

1. **Keep Monitoring Open**: Open `index.html` and keep it running in your browser
2. **Share Access Link**: Give the `access.html` link to others or use it for testing
3. **Trigger Alert**: When someone opens `access.html`, it immediately:
   - Shows a warning message on the access page
   - Sends a signal to the monitoring page
   - Monitoring page turns RED and plays alert sound
   - Logs the access event with timestamp

## How It Works

- **Normal State (Green)**: Regular device usage detected
- **Dangerous State (Red)**: Unauthorized access detected
  - Circle turns red and pulses
  - Background changes to red tint
  - Alert sound plays automatically
  - Auto-resets after 10 seconds of normal activity

## Controls

- **Test Sound Button**: Manually plays the alert sound
- **Reset Detection Button**: Manually resets the system to normal state

## Browser Compatibility

Works best in modern browsers that support:
- Device Orientation API
- Page Visibility API
- Battery Status API
- Audio playback

## Customization

You can customize:
- Alert sound (replace `music.mp3`)
- Detection sensitivity (modify JavaScript thresholds)
- Visual styling (edit CSS)
- Detection methods (add/remove event listeners)

## Security Note

This is a client-side monitoring system. For enhanced security, consider:
- Server-side monitoring
- Additional authentication methods
- Physical security measures
- Parental control software
