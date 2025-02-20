package FullStack.InformaColombia.Config.Security.Jwt.service;

import FullStack.InformaColombia.Config.Security.Jwt.JwtUtil;
import FullStack.InformaColombia.dto.request.UsuarioRequest;
import FullStack.InformaColombia.dto.request.UsuarioXRolRequest;
import FullStack.InformaColombia.entity.RolUsuario;
import FullStack.InformaColombia.entity.Usuario;
import FullStack.InformaColombia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

@Service
public class AuthenticationService implements UserDetailsService{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.ByUser(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }

    public String authenticate(String username, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password, null)
            );
            final UserDetails userDetails = loadUserByUsername(username);
            return jwtTokenUtil.generateToken(userDetails);
        } catch (BadCredentialsException e) {
            throw e;
        }
    }

    public String crearUsuario(UsuarioRequest usuario){
        String mensaje = "";
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        try {
            Usuario user = new Usuario();
            user.setCreateAt(new Date());
            user.setEstado("A");
            user.setNombre(usuario.getNombre());
            user.setEmail(usuario.getEmail());
            user.setPassword(passwordEncoder.encode(usuario.getPassword()));
            user.setUpdateAt(null);
            int rowAffect = this.usuarioRepository.insertUser(user);
            if(rowAffect>0){
                mensaje = "usuario Ingresado";
            }else{
                mensaje = "Hubo un error";
            }
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
            mensaje = "internal server error";
        }
        return mensaje;
    }

    public String AsignacionRolUsuario(UsuarioXRolRequest  usuarioXRolRequest){
        String mensaje = "";
        try {
            RolUsuario rolUsuario = new RolUsuario();
            rolUsuario.setEstado("A");
            rolUsuario.setIdUsuario(usuarioXRolRequest.getIdUsuario());
            rolUsuario.setIdRol(usuarioXRolRequest.getIdRol());
            int rowAffect = this.usuarioRepository.insertRolUsuario(rolUsuario);
            if(rowAffect>0){
                mensaje = "Rol Asignado";
            }else{
                mensaje = "Hubo un error";
            }
        }catch (Exception e) {
            e.getStackTrace();
            System.out.println(e.getMessage());
            mensaje = "internal server error";
        }

        return mensaje;
    }

}
