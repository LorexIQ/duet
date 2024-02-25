import { osName, osVersion, deviceType, deviceModel, deviceVendor } from '@tenrok/vue-device-detect';
import { DeviceUUID } from 'device-uuid';

export type UseDeviceMetaReturn = {
    uuid: string
    name: string;
    os: string;
};

export default function (): UseDeviceMetaReturn {
    return {
        uuid: new DeviceUUID().get(),
        name: deviceType() === 'desktop' ? 'PC' : `${deviceVendor()} ${deviceModel()}`,
        os: `${osName()} ${osVersion()}`
    };
}
