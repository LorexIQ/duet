import {ExceptionGenerator} from "./ExceptionGenerator";

// 401 - Unauthorized
export const AuthorizedUserNotFoundException = new ExceptionGenerator(401, 1, 'Авторизированный пользователь не найден');
export const AuthorizedSessionNotFoundException = new ExceptionGenerator(401, 2, 'Авторизированная сессия не найдена. Возможно она истекла или была закрыта');

// 403 - Forbidden
export const UserNotFoundException = new ExceptionGenerator(403, 0, 'Пользователь не найден');
export const IncorrectPasswordException = new ExceptionGenerator(403, 1, 'Неверный пароль');
export const DBWorkException = new ExceptionGenerator(403, 2, 'Ошибка работы базы данных');
export const VKSilentTokenException = new ExceptionGenerator(403, 3, 'Токен был уже использован или недействетелен');
export const VKGetUserException = new ExceptionGenerator(403, 4, 'Ошибка получения информации об вк пользователе');

// 404 - Not found
export const DeviceIsNotFoundException = new ExceptionGenerator(404, 0, 'Устройство сессии не найдено');
export const SessionNotFoundException = new ExceptionGenerator(404, 1, 'Сессия не найдена');

// 409 - Conflict
export const AccountDataConflictException = new ExceptionGenerator(409, 0, 'Данные уже были использованы в другом аккаунте');

// 423 - Locked
export const SessionAccessDividedException = new ExceptionGenerator(423, 0, 'Доступ к чужим сессиям запрещён');
export const ContentAccessDividedException = new ExceptionGenerator(423, 1, 'Доступ к контенту ограничен. Обратитесь к администратору');

// 520 - Unknown
export const UnknownErrorException = new ExceptionGenerator(520, 0, 'Неизвестная ошибка');
export const SessionDeleteException = new ExceptionGenerator(520, 1, 'Ошибка удаления сессии');
