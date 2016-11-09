import { KeyboardKeys } from '../../models/enums/keyboard-keys';

export class KeyMapper {

    static MapKeyBoardKey(key: KeyboardEvent): KeyboardKeys {
        let direction: KeyboardKeys
        if (key.keyCode === 40) {
            direction = KeyboardKeys.Down;
        } else if (key.keyCode === 38) {
            direction = KeyboardKeys.Up;
        } else if (key.keyCode === 13) {
            direction = KeyboardKeys.Enter;
        }
        else { return KeyboardKeys.KeyNotMapped; }

        return direction;
    }


}
