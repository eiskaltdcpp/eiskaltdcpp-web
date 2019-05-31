project (eiskaltdcpp-web)
cmake_minimum_required (VERSION 3.0)

if (UNIX AND NOT APPLE AND NOT HAIKU)
    # Launcher, desktop file, etc.
    install (FILES linux/${PROJECT_NAME}
             DESTINATION "${CMAKE_INSTALL_PREFIX}/bin"
             PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE)
    install (FILES linux/${PROJECT_NAME}.png
             DESTINATION "${CMAKE_INSTALL_PREFIX}/share/pixmaps")
    install (FILES linux/${PROJECT_NAME}.desktop
             DESTINATION "${CMAKE_INSTALL_PREFIX}/share/applications")

    # Config
    install (FILES config.js
             DESTINATION "${CMAKE_INSTALL_PREFIX}/etc"
             RENAME ${PROJECT_NAME}.conf)
    set (CONFIG_RELATIVE_PATH "../etc/${PROJECT_NAME}.conf")
    set (CONFIG_SYMLINK "${CMAKE_INSTALL_PREFIX}/share/eiskaltdcpp/web/config.js")
    install(CODE "execute_process(COMMAND ${CMAKE_COMMAND} -E create_symlink ${CONFIG_RELATIVE_PATH} ${CONFIG_SYMLINK})")

    # Web UI files and directories
    install (FILES index.html style.css favicon.ico
             DESTINATION "${CMAKE_INSTALL_PREFIX}/share/eiskaltdcpp/web")
    install (DIRECTORY images js
             DESTINATION "${CMAKE_INSTALL_PREFIX}/share/eiskaltdcpp/web")
else ()
    # Web UI files and directories
    install (FILES config.js index.html style.css favicon.ico
             DESTINATION "${CMAKE_INSTALL_PREFIX}/web-ui")
    install (DIRECTORY images js
             DESTINATION "${CMAKE_INSTALL_PREFIX}/web-ui")

    # Documentation
    if (WIN32)
        install (FILES README.html windows/help.html
                 DESTINATION "${CMAKE_INSTALL_PREFIX}/web-ui")
    endif (WIN32)
endif ()

add_custom_target (uninstall
    COMMAND xargs -a "${CMAKE_CURRENT_BINARY_DIR}/install_manifest.txt" rm
)

