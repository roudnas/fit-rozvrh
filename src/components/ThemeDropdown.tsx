import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiFillSetting } from 'react-icons/ai';

export const DEFAULT_THEME = {
  header: '#DFB479',
  tut: '#AED581',
  lab: '#4FC3F7',
  lec: '#FFB74D',
};

type ColorInputProps = {
  label: string;
  value: string;
  setValue: (newVal: string) => void;
};

const ColorInput = ({ label, value, setValue }: ColorInputProps) => {
  return (
    <div className={'d-flex flex-row align-items-center'}>
      <label className={'p-0 pe-1 me-auto'}>{label}:</label>
      <input
        type={'color'}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export function ThemeDropdown() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme')
      ? JSON.parse(localStorage.getItem('theme') as string)
      : DEFAULT_THEME,
  );

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-tut', theme.tut);
    document.documentElement.style.setProperty('--bg-lab', theme.lab);
    document.documentElement.style.setProperty('--bg-lec', theme.lec);
    document.documentElement.style.setProperty('--header', theme.header);
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const setThemeValue = (key: string, value: string) => {
    const themeCopy = { ...theme };
    themeCopy[key] = value;
    setTheme(themeCopy);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-bold bg-black"
        variant="secondary"
        id="dropdown-basic"
      >
        <AiFillSetting />
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-2">
        <p>Theme</p>
        <hr className="m-0" />
        <div className="my-2">
          <ColorInput
            label={'Header'}
            value={theme.header}
            setValue={(e) => setThemeValue('header', e)}
          />
          <ColorInput
            label={'Lec'}
            value={theme.lec}
            setValue={(e) => setThemeValue('lec', e)}
          />
          <ColorInput
            label={'Tut'}
            value={theme.tut}
            setValue={(e) => setThemeValue('tut', e)}
          />
          <ColorInput
            label={'Lab'}
            value={theme.lab}
            setValue={(e) => setThemeValue('lab', e)}
          />
        </div>
        <Badge
          className={'lesson'}
          bg={'black'}
          onClick={() => {
            setTheme(DEFAULT_THEME);
          }}
        >
          Reset
        </Badge>
      </Dropdown.Menu>
    </Dropdown>
  );
}
