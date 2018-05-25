package com.tunitenative;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener; 

public class MainActivity extends ReactActivity {
    private PermissionListener listener;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TuniteNative";
    }

   
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
            super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}
