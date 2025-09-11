# Sequential Login Testing

This document explains how to run the sequential login test that tests all users from the `users.json` file.

## Overview

The sequential login test automatically:
1. Loads all users from `src/data/users.json`
2. Tests each user login sequentially
3. Handles errors gracefully by restarting the app if needed
4. Logs out after each successful login to prepare for the next user
5. Provides detailed console output for monitoring progress

## Users Tested

The test will run with the following users from `users.json`:
- Aid_Monitor: john2314@yopmail.com
- Client_Onboarded: newclient@yopmail.com  
- Driver_Onboarded: newdriver@yopmail.com
- Client: ahsan.kahn@yopmail.com
- Guardian: ahsan12@yopmail.com
- Driver: ahsankhn@yopmail.com

## Running the Test

### Android Sequential Login Test
```bash
npm run test:android -- --spec="src/features/mobile_android/rider/sequential_login.feature"
```

### Run with specific tags
```bash
npm run test:android -- --spec="src/features/mobile_android/rider/sequential_login.feature" --cucumberOpts.tags="@sequential_login"
```

## Features

### Error Handling
- If a login fails, the app is automatically restarted
- If logout fails, the app is restarted to ensure clean state
- Comprehensive error logging for debugging

### Recovery Mechanism
- App restart functionality when errors occur
- Automatic carousel skipping after restart
- Login screen verification after restart

### Logging
- Detailed console output showing progress
- Success/failure indicators for each user
- Error messages with context

## Test Flow

1. **App Launch**: Launches NoahCare Android app
2. **Carousel Skip**: Skips the carousel screen if present
3. **Login Screen Verification**: Ensures we're on the login screen
4. **Sequential Testing**: For each user:
   - Verifies login screen presence
   - Performs login with user credentials
   - Verifies successful login (home screen)
   - Performs logout
   - Verifies return to login screen
5. **Error Recovery**: If any step fails, restarts the app and continues

## Console Output Example

```
Starting sequential login test with 6 users

--- Testing user 1/6: Aid_Monitor (john2314@yopmail.com) ---
Already on login screen
Login successful for Aid_Monitor
Logout successful
✅ User Aid_Monitor login test completed successfully

--- Testing user 2/6: Client_Onboarded (newclient@yopmail.com) ---
Already on login screen
Login successful for Client_Onboarded
Logout successful
✅ User Client_Onboarded login test completed successfully

... (continues for all users)

✅ All users have been tested successfully
```

## Troubleshooting

### Common Issues
1. **App not launching**: Check that the APK path is correct in the config
2. **Login failures**: Verify user credentials in `users.json`
3. **Timeout errors**: Increase timeout values in the step definitions if needed
4. **Element not found**: Check if the app UI has changed and update locators

### Debug Mode
Run with verbose logging:
```bash
npm run test:android -- --spec="src/features/mobile_android/rider/sequential_login.feature" --logLevel=debug
```
