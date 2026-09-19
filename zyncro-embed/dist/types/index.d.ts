/**
 * @zyncro/embed — Official JavaScript Embed SDK
 * Universal embedding engine for Zyncro scheduling calendars.
 *
 * (c) Zyncro Infotech Private Limited. All rights reserved.
 * https://zyncro.in
 */
import { mountInline, unmountInline } from "./core/iframe";
import { getGlobalOrigin, setGlobalOrigin } from "./core/url-builder";
import { ZyncroSDK } from "./types";
import { mountFloatingButton } from "./ui/floating-button";
import { closeModal, isModalOpen, openModal } from "./ui/modal";
export * from "./types";
export declare const Zyncro: ZyncroSDK;
export { closeModal, getGlobalOrigin, isModalOpen, mountFloatingButton, mountInline, openModal, setGlobalOrigin, unmountInline };
export default Zyncro;
