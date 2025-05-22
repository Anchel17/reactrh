package com.reactrh.record;

import com.reactrh.enums.UserRole;

public record RegisterRecord(String login, String password, UserRole role) {

}
