# 🐛 Troubleshooting - TaskFlow

This page contains solutions for the most common problems that may occur when using TaskFlow. If your problem is not listed here, consult our [support section](#support).

## 🚫 Installation Problems

### Error: "Node.js not found"
**Symptoms:** Error "node: command not found" when running commands.

**Solutions:**
1. Check if Node.js is installed: `node --version`
2. Download and install Node.js 18+ from the official website
3. Restart the terminal after installation
4. Check if the PATH is configured correctly

### Error: "npm not found"
**Symptoms:** Error "npm: command not found".

**Solutions:**
1. npm usually comes with Node.js
2. If not installed: `npm install -g npm`
3. Check version: `npm --version`
4. Use yarn as an alternative if preferred

### Error during `npm install`
**Symptoms:** Failure to install dependencies.

**Solutions:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Use yarn if npm fails
yarn install

# Check internet connection
ping registry.npmjs.org
```

## 🖥️ Interface Problems

### Application doesn't load
**Symptoms:** White page or error when loading.

**Solutions:**
1. **Clear browser cache:**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (macOS)

2. **Check browser console:**
   - F12 → Console
   - Look for JavaScript errors

3. **Disable extensions:**
   - Some extensions may interfere
   - Test in incognito mode

4. **Check URL:**
   - Make sure you're accessing the correct URL
   - For development: `http://localhost:5173`

### Buttons don't work
**Symptoms:** Clicks don't produce effect.

**Solutions:**
1. Check if JavaScript is enabled
2. Test in another browser
3. Temporarily disable ad blockers
4. Check for conflicts with other extensions

### Broken/distorted layout
**Symptoms:** Misaligned or overlapping elements.

**Solutions:**
1. **Resize the browser window**
2. **Toggle theme:** Settings → Theme
3. **Reset zoom:** Ctrl+0 (Windows/Linux) or Cmd+0 (macOS)
4. **Clear cache:** Ctrl+Shift+R

## 💾 Data Problems

### Tasks not being saved
**Symptoms:** Tasks disappear after reloading.

**Solutions:**
1. **Check localStorage:**
   - F12 → Application/Storage → Local Storage
   - Look for key "taskflow-data"

2. **Incognito mode:**
   - Data doesn't persist in private mode
   - Use normal browser window

3. **Disabled cookies:**
   - localStorage requires enabled cookies
   - Check privacy settings

4. **Insufficient space:**
   - Clear browser data
   - Check disk space

### Corrupt data
**Symptoms:** Error loading data or strange behavior.

**Solutions:**
1. **Export existing data** (if possible)
2. **Clear application data:**
   ```javascript
   // In browser console:
   localStorage.removeItem('taskflow-data')
   location.reload()
   ```
3. **Reimport data** from backup
4. **Restart browser**

### Data loss after update
**Symptoms:** Data disappears after update.

**Solutions:**
1. **Backup before updating**
2. **Use official export/import**
3. **Check compatibility** between versions
4. **Contact support** if data is critical

## 🔍 Search and Filter Problems

### Search doesn't find tasks
**Symptoms:** Search doesn't return expected results.

**Solutions:**
1. **Check spelling** of terms
2. **Search is case-insensitive** (doesn't differentiate uppercase)
3. **Search in titles AND descriptions**
4. **Use more specific terms**

### Filters don't work
**Symptoms:** Filters don't change the list.

**Solutions:**
1. **Check if there are tasks** in the selected filter
2. **Reload the page**
3. **Clear other active filters**
4. **Check task status** (completed/pending)

## 📅 Date Problems

### Dates don't appear correctly
**Symptoms:** Incorrect date formatting.

**Solutions:**
1. **Check system time zone**
2. **Local format:** Depends on browser settings
3. **ISO dates:** Always saved in UTC format
4. **Refresh the page** to reflect changes

### Reminders don't work
**Symptoms:** Date notifications don't appear.

**Solutions:**
1. **Browser permissions:**
   - Click the lock in the address bar
   - Allow notifications

2. **Application settings:**
   - Settings → Notifications → Enable

3. **Check dates:**
   - Make sure there are future-dated tasks

## 🎨 Appearance Problems

### Theme doesn't change
**Symptoms:** Theme toggle doesn't work.

**Solutions:**
1. **Reload the page** after changing theme
2. **Clear cache:** Ctrl+Shift+R
3. **Check localStorage** for theme configuration
4. **Automatic mode:** May depend on operating system

### Incorrect fonts or colors
**Symptoms:** Appearance different from expected.

**Solutions:**
1. **Reset appearance settings**
2. **Check CSS support** in browser
3. **Disable interfering extensions**
4. **Test in another browser**

## 📱 Mobile Problems

### Non-responsive interface
**Symptoms:** Layout doesn't adapt to screen.

**Solutions:**
1. **Resize browser window** in desktop
2. **Use device mode** in DevTools
3. **Check meta viewport** of page
4. **Update to latest version**

### Touch gestures don't work
**Symptoms:** Drag, tap don't produce effect.

**Solutions:**
1. **Single tap first**, then gestures
2. **Check if touch is enabled**
3. **Test on real device** vs emulator
4. **Clear application cache**

## 🔧 Technical Problems

### Slow application
**Symptoms:** Interface freezing or slow.

**Solutions:**
1. **Clear browser cache**
2. **Close other tabs/applications**
3. **Check memory usage**
4. **Update browser**

### JavaScript errors in console
**Symptoms:** Red errors in browser console.

**Solutions:**
1. **Note the exact error**
2. **Check if it's a known error** in this documentation
3. **Test in another browser**
4. **Report the bug** with details

### Conflict with other extensions
**Symptoms:** Strange behavior with certain extensions.

**Solutions:**
1. **Disable extensions one by one**
2. **Test in incognito mode**
3. **Check productivity extensions**
4. **Update or remove** problematic extensions

## 🌐 Network Problems

### Offline application doesn't work
**Symptoms:** Limited functionalities offline.

**Solutions:**
1. **Service Worker:** Check if registered
2. **Cache:** Some resources may need internet
3. **Synchronization:** Data syncs when back online
4. **Limited functionalities** are expected offline

### Synchronization problems
**Symptoms:** Data doesn't sync between devices.

**Solutions:**
1. **Latest version:** Make sure using latest version
2. **Stable connection:** Check internet
3. **Local data:** Synchronization is manual for now
4. **Backup first:** Always backup before changes

## 🔄 Update Problems

### Data disappeared after update
**Symptoms:** Data loss after update.

**Solutions:**
1. **Mandatory backup** before updating
2. **Compatible version:** Check compatibility
3. **Migrated data:** Some updates migrate data
4. **Support:** Contact if data is critical

### New features don't appear
**Symptoms:** Mentioned features not available.

**Solutions:**
1. **Hard refresh:** Ctrl+Shift+R or Cmd+Shift+R
2. **Clear cache completely**
3. **Check application version**
4. **Restart browser**

## 📞 Support and Additional Help

### When to seek help
- Problem persists after trying solutions
- Specific error not documented
- Important data lost
- Critical behavior affected

### How to get help
1. **Documentation:** Check relevant sections
2. **GitHub Issues:** Look for similar problems
3. **Community forum:** Ask the community
4. **Bug report:** For technical problems

### Useful information for reporting
- **Browser version** and operating system
- **Steps to reproduce** the problem
- **Expected behavior** vs actual
- **Screenshots** or videos
- **Browser console logs**

---

## 🚀 Problem Prevention

### Regular Maintenance
- **Update regularly** for corrections
- **Weekly backup** of data
- **Monthly cache cleaning**
- **Regular compatibility check**

### Best Practices
- **Use updated browsers**
- **Keep JavaScript enabled**
- **Allow notifications** when prompted
- **Backup** before major changes

### Monitoring
- **Check console** periodically
- **Monitor storage usage**
- **Follow project updates**
- **Test critical functionalities**

**💡 Tip:** Many problems are solved simply by reloading the page or clearing the cache!
