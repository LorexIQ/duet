import type { UseDeviceMetaReturn } from "~/composables/useDeviceMeta";

export interface AuthVkBodyEntity {
    vk: VKPayloadEntity;
    device: UseDeviceMetaReturn;
}

interface VKPayloadEntity {
    token: string;
    uuid: string;
}
