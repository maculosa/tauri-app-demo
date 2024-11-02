use tauri::{Menu, Submenu, MenuItem};

pub fn create_menu() -> Menu {
    let file_menu = Submenu::new("文件", Menu::new()
       .add_item(MenuItem::Quit)
    );
}