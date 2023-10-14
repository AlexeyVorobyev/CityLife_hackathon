import { useState } from "react";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {ItemTree} from "./SideBarConfig";

const MenuItem = ({ config,level,callback }:{config:any,level:number,callback:Function}) => {
    return (
        <ListItemButton
            sx={{ pl: level * 2 }}
            onClick={() => callback(config.title)}
        >
            <ListItemText primary={config.title} />
        </ListItemButton>
    );
};

const ExpandableMenuItem = ({ config,level,callback }:{config:any,level:number,callback:Function}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    };

    return (
        <div>
            <ListItemButton onClick={handleClick} sx={{ pl: level*2}}>
                <ListItemText primary={config.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Menu items={config.items} level={level + 1} callback={callback}/>
            </Collapse>
        </div>
    );
};

const Menu = ({ items,level,callback }:{items:ItemTree[],level:number, callback:Function}) => {
    const createList = (items:ItemTree[],level:number) => {
        console.log(level,'123')
        let menu:any[] = [];
        items.map((menuItem:any) => {
            if (Array.isArray(menuItem.items) && menuItem.items.length > 0) {
                menu.push(<ExpandableMenuItem
                    config={menuItem}
                    key={menuItem.title}
                    level={level}
                    callback={callback}
                />);
            } else {
                menu.push(<MenuItem
                    config={menuItem}
                    key={menuItem.title}
                    level={level}
                    callback={callback}
                />);
            }
        });
        return menu.concat();
    };

    console.log(level)

    return <List>{createList(items,level)}</List>;
}

export {Menu}