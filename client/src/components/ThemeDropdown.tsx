import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillSetting } from 'react-icons/ai';

import { getContrastTextColor } from '../utils/colorBrightness'

export const DEFAULT_THEME = {
    /**
   * The header component background color
   */
    header: '#DFB479',
    /**
   * The header component text color
   */
    headerText: '#212529',
    /**
   * The tutorial component background color
   */
    tut: '#AED581',
    /**
   * The tutorial component text color
   */
    tutText: '#212529',
    /**
   * The laboratory component background color
   */
    lab: '#4FC3F7',
    /**
   * The laboratory component text color
   */
    labText: '#212529',
    /**
   * The lecture component background color
   */
    lec: '#FFB74D',
    /**
   * The lecture component text color
   */
    lecText: '#212529',
    /**
   * The note component background color
   */
    note: '#FF0000',
    /**
   * The note component text color
   */
    noteText: '#FFFFFF',
    /**
   * The light text color
   */
    lightText: '#FFFFFF',
    /**
   * The dark text color
   */
    darkText: '#212529',
};

/**
 * The color input properties
 */
type ColorInputProps = {
  label: string;
  value: string;
  setValue: (newVal: string) => void;
  noteLabel?: string;
  noteValue?: string;
  noteSetValue?: (newVal: string) => void;
};

/**
 * Generates the header color input component
 * @param param0 The properties
 * @returns The header color input component
 */
const HeaderColorInput = ({ label, value, setValue }: ColorInputProps) => {
    const bg = label.toLowerCase().includes(`header`) ? `bg-second` : `bg-${label.toLowerCase()}`;
    return (
        <div
            className={`w-80 rounded ${bg}`}
            style={{
                display:'stretch',
                height: 60,
                padding: 10,
                margin: 10,
                alignItems: 'stretch',
            }}>
            <h6 className="m-0 text-bold">{label}</h6>
            <input
                type={'color'}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                style={{width:`100%`}}
            />
        </div>
    );
};

/**
 * Generates the color input component. Has an option for creating a note color input component accessible via the note properties
 * @param param0 The properties
 * @returns The color input component
 */
const ColorInput = ({ label, value, setValue, noteLabel, noteValue, noteSetValue }: ColorInputProps) => {
    const bg = label.toLowerCase().includes(`header`) ? `bg-second` : `bg-${label.toLowerCase()}`;
    return (
        <div
            className={`lesson rounded ${bg}`}
            style={{
                width: '29%',
                display:'inline-block',
                padding: 10,
                margin: 10,
                justifyContent: 'space-between',
                alignItems: 'stretch',
      
            }}>
            <h6 className="text-bold">{label}</h6>
            <input
                type={'color'}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                style={{width:`100%`}}
            />
            {noteLabel && noteValue && noteSetValue && (
                <h6 className="note bg-note p-1 text-bold rounded">
                    {noteLabel}
                    <input
                        type={'color'}
                        value={noteValue}
                        onChange={(e) => {
                            noteSetValue(e.target.value);
                        }}
                        style={{width:`100%`}}
                    />
                </h6>
            )}
        </div>
    );
};

/**
 * Gets the theme dropdown
 * @returns The theme dropdown
 */
export function ThemeDropdown() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme')
            ? JSON.parse(localStorage.getItem('theme') as string)
            : DEFAULT_THEME,
    );

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        document.documentElement.style.setProperty('--bg-tut', theme.tut);
        document.documentElement.style.setProperty('--bg-tutText', theme.tutText);
        document.documentElement.style.setProperty('--bg-lab', theme.lab);
        document.documentElement.style.setProperty('--bg-labText', theme.labText);
        document.documentElement.style.setProperty('--bg-lec', theme.lec);
        document.documentElement.style.setProperty('--bg-lecText', theme.lecText);
        document.documentElement.style.setProperty('--header', theme.header);
        document.documentElement.style.setProperty('--bg-headerText', theme.headerText);
        document.documentElement.style.setProperty('--bg-note', theme.note);
        document.documentElement.style.setProperty('--bg-noteText', theme.noteText);
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    /**
   * Sets the theme value
   * @param value The color value
   * @param key The theme name
   * @param keyText The according text theme name
   */
    const setThemeValue = ( value: string, key: string, keyText?: string) => {
        const themeCopy = { ...theme };
        themeCopy[key] = value;
        if (keyText !== undefined) {themeCopy[keyText] = getContrastTextColor(value);}
        setTheme(themeCopy);
    };

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                className="text-bold bg-black">
                <AiFillSetting />
            </Button>
            <Modal
                className="modal-dark py-3 text-center text-light"
                show={show}
                onHide={handleClose}
                style={{alignItems: 'center'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Theme settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <HeaderColorInput
                            label={'Header'}
                            value={theme.header}
                            setValue={(e) => setThemeValue(e, 'header', 'headerText')}
                        />
                    </div>
                    <div>
                        <ColorInput
                            label={'Lec'}
                            value={theme.lec}
                            setValue={(e) => setThemeValue(e, 'lec', 'lecText')}/>
                        <ColorInput
                            label={'Lab'}
                            value={theme.lab}
                            setValue={(e) => setThemeValue(e, 'lab', 'labText')}/>
                        <ColorInput
                            label={'Tut'}
                            value={theme.tut}
                            setValue={(e) => setThemeValue(e, 'tut', 'tutText')}
                            noteLabel={'note'}
                            noteValue={theme.note}
                            noteSetValue={(e) => setThemeValue(e, 'note', 'noteText')}/>
                    </div>          
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        className={'w-100 bg-black'}
                        onClick={() => {
                            setTheme(DEFAULT_THEME);
                        }}>
            Reset
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
